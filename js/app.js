(function () {
  const qoutesEL = document.querySelector(".quotes");
  const loader = document.querySelector(".loader");
  
  const getQuotes = async (page, limit) => {
    const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
    const response = await fetch(API_URL);
    // handle 404
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
  };

  const showQuotes = (quotes) => {
    quotes.forEach((quote) => {
      const quoteEL = document.createElement("blockquote");
      quoteEL.classList.add("quote");

      quoteEL.innerHTML = `
        <span>${quote.id})&nbsp</span>
        <p>${quote.quote}</p>
        <footer>"${quote.author}"</footer>
        `;
      qoutesEL.appendChild(quoteEL);
    });
  };
  const hideLoader = () => {
    loader.classList.remove("show");
  };
  const showLoader = () => {
    loader.classList.add("show");
  };
  
  const hasMoreQuotes = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  const loadQuotes = async (page, limit) => {
    showLoader();
    console.log(loader);
    setTimeout(async () => {
      try {
        if (hasMoreQuotes(page, limit, total)) {
          const response = await getQuotes(page, limit);
          showQuotes(response.data);
          total = response.total;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 500);
  };
  let currentPage = 1;
  const limit = 10;
  let total = 0;

  window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        hasMoreQuotes(currentPage, limit, total)
      ) {
        console.log("load more");1
        currentPage++;
        loadQuotes(currentPage, limit);
      }
    },
    {
      passive: true,
    }
  );

  loadQuotes(currentPage, limit);
})();
