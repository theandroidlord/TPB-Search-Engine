async function searchTPB() {
            const query = document.getElementById('searchQuery').value;
            try {
                // Use a proxy to bypass restrictions
                const proxyUrl = 'https://api.allorigins.win/get?url=';
                const apiUrl = `https://apibay.org/q.php?q=${encodeURIComponent(query)}`;
                const response = await fetch(`${proxyUrl}${encodeURIComponent(apiUrl)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const parsedData = JSON.parse(data.contents);
                displayResults(parsedData);
            } catch (error) {
                console.error('Failed to fetch:', error);
                alert(`Failed to fetch data: ${error.message}`);
            }
        }

        function displayResults(results) {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            results.slice(0, 5).forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                resultDiv.innerHTML = `
                    <strong>${result.name}</strong><br>
                    Seeds: ${result.seeders} | Leeches: ${result.leechers}<br>
                    <button class="copy-button" onclick="copyMagnet('${result.magnet}')">Copy Magnet</button>
                `;
                resultsDiv.appendChild(resultDiv);
            });
        }

        function copyMagnet(magnet) {
            navigator.clipboard.writeText(magnet).then(() => {
                alert('Magnet link copied to clipboard!');
            });
        }