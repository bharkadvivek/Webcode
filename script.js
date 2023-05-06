const form = document.querySelector('#nationalizeForm');
const resultsDiv = document.querySelector('#results');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  nationalizeAPI();
});

async function nationalizeAPI() {
  try {
    const name = form.elements.name.value;
    const title = form.elements.title.value;
    const type = form.elements.type.value;
    const year = form.elements.year.value;

    let apiUrl = `https://api.nationalize.io?name=${name}`;
    if (title) {
      apiUrl += `&title=${title}`;
    }
    if (type) {
      apiUrl += `&type=${type}`;
    }
    if (year) {
      apiUrl += `&year=${year}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const mostLikelyNationality = data.country[0].country_id;
    resultsDiv.innerHTML = `Most likely nationality: ${mostLikelyNationality}`;
  } catch (error) {
    resultsDiv.innerHTML = error.message;
  }
}
