const books = document.getElementById("books");
const endpoint = "http://localhost:3000/books";
axios.get(endpoint).then((res) => {
  if (res.status === 200) {
    const data = res.data;

    data.forEach((book) => {
      books.innerHTML += `<div class="book">
          <p><strong>Title:</strong> ${book.title}</p>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Year:</strong> ${book.year}</p>
          <p><strong>Price:</strong> ${book.price} AZN</p>
        </div>`;
    });
  }
});
