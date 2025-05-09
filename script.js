const customDictionary = JSON.parse(localStorage.getItem('customDictionary')) || {};

document.getElementById('searchButton').addEventListener('click', async () => {
  const word = document.getElementById('wordInput').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');

  if (word) {
    if (customDictionary[word]) {
      displayResult(word, [{ definition: customDictionary[word] }]);
    } else {
      try {
        const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        displayResult(word, data.list);
      } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
      }
    }
  } else {
    resultDiv.innerHTML = `<p>Please enter a slang word to search for its definition.</p>`;
  }
});

function displayResult(word, definitions) {
  const resultDiv = document.getElementById('result');
  if (!definitions || definitions.length === 0) {
    resultDiv.innerHTML = `<p>No definition found for "${word}".</p>`;
  } else {
    const defList = definitions.slice(0, 3).map(def => `<li>${def.definition}</li>`).join('');
    resultDiv.innerHTML = `<h2>Definitions for "${word}"</h2><ul>${defList}</ul>`;
  }
}

