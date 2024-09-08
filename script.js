// Sample book data (with categories)
const books = [
  { title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction", borrowed: false },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", borrowed: false },
  { title: "1984", author: "George Orwell", category: "Dystopian", borrowed: false },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", borrowed: false },
  { title: "Moby Dick", author: "Herman Melville", category: "Adventure", borrowed: false },
  { title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", borrowed: false },
  { title: "Brave New World", author: "Aldous Huxley", category: "Dystopian", borrowed: false },
  { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", borrowed: false },
  { title: "War and Peace", author: "Leo Tolstoy", category: "Historical", borrowed: false },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", category: "Classic", borrowed: false },
  { title: "The Odyssey", author: "Homer", category: "Epic", borrowed: false },
  { title: "The Alchemist", author: "Paulo Coelho", category: "Philosophical", borrowed: false },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", category: "Magical Realism", borrowed: false },
  { title: "The Divine Comedy", author: "Dante Alighieri", category: "Epic", borrowed: false }
];

// Book categories
const categories = [
  "Fiction", "Dystopian", "Classic", "Adventure", "Romance",
  "Fantasy", "Historical", "Epic", "Philosophical", "Magical Realism"
];

// Borrow history array
let borrowHistory = [];

// Initialize app
window.onload = function () {
  loadBooks(books); // Load all books initially
  loadCategories(categories); // Load categories
  loadBorrowHistory(); // Load any borrowing history
};

// Load books into the book list
function loadBooks(bookArray) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  bookArray.forEach((book, index) => {
    if (!book.borrowed) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>${book.title} by ${book.author}</span>
          <button class="btn btn-sm btn-primary" onclick="borrowBook(${index})">Borrow</button>
        `;
      bookList.appendChild(li);
    }
  });
}

// Load categories into the category list
function loadCategories(categoryArray) {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";
  categoryArray.forEach(category => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = category;
    li.onclick = () => filterByCategory(category); // Add click functionality
    categoryList.appendChild(li);
  });
}

// Filter books by selected category
function filterByCategory(selectedCategory) {
  const filteredBooks = books.filter(book => book.category === selectedCategory && !book.borrowed);
  loadBooks(filteredBooks); // Display only books in selected category
}

// Handle book borrowing
function borrowBook(bookIndex) {
  const book = books[bookIndex];
  book.borrowed = true; // Mark book as borrowed
  borrowHistory.push({
    book,
    date: new Date().toLocaleDateString(),
    id: bookIndex // store index to identify for return
  });
  loadBooks(books); // Update book list to reflect borrowed status
  loadBorrowHistory(); // Update the borrowing history
}

// Load borrowing history with "Return" button
function loadBorrowHistory() {
  const borrowHistoryList = document.getElementById("borrowHistory");
  borrowHistoryList.innerHTML = ""; // Clear existing content

  if (borrowHistory.length === 0) {
    // If no borrowing history, show a message
    const li = document.createElement("li");
    li.className = "list-group-item text-center";
    li.textContent = "No borrowing history available.";
    borrowHistoryList.appendChild(li);
  } else {
    // If there is borrowing history, display it
    borrowHistory.forEach((historyItem, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>${historyItem.book.title} borrowed on ${historyItem.date}</span>
          <button class="btn btn-sm btn-warning" onclick="returnBook(${historyItem.id}, ${index})">Return</button>
        `;
      borrowHistoryList.appendChild(li);
    });
  }
}


// Handle returning the book from the history list
function returnBook(bookIndex, historyIndex) {
  books[bookIndex].borrowed = false; // Set book as not borrowed
  borrowHistory.splice(historyIndex, 1); // Remove from borrow history
  loadBooks(books); // Reload book list to include returned book
  loadBorrowHistory(); // Reload borrow history
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm) ||
    book.category.toLowerCase().includes(searchTerm)
  );

  if (filteredBooks.length > 0) {
    loadBooks(filteredBooks); // If books are found, load them
  } else {
    displayNoBooksFoundMessage(); // If no books found, show a message
  }
});

// Function to display a "No books found" message
function displayNoBooksFoundMessage() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = ""; // Clear the current list
  const li = document.createElement("li");
  li.className = "list-group-item text-center";
  li.textContent = "No books found.";
  bookList.appendChild(li); // Append the message to the book list
}
