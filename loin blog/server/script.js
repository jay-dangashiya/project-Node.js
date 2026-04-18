const API = "http://localhost:5000/api";

// Auto login check
window.onload = () => {
  const token = localStorage.getItem("token");
  if (token) {
    showBlogUI();
    getBlogs();
  }
};

// Show Blog UI
function showBlogUI() {
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("blogSection").classList.remove("hidden");
}

// Logout
function logout() {
  localStorage.removeItem("token");
  location.reload();
}

// REGISTER
async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("All fields required!");
    return;
  }

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered Successfully");
    } else {
      alert(data.msg || "Register failed");
    }
  } catch (err) {
    alert("Server error");
  }
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      showBlogUI();
      getBlogs();
    } else {
      alert(data.msg || "Login failed");
    }
  } catch (err) {
    alert("Server not running");
  }
}

// GET BLOGS
async function getBlogs() {
  const container = document.getElementById("blogs");
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(`${API}/blogs`);
    const blogs = await res.json();

    if (!Array.isArray(blogs)) {
      container.innerHTML = "No blogs found";
      return;
    }

    container.innerHTML = "";

    blogs.forEach((blog) => {
      container.innerHTML += `
        <div class="p-4 mb-3 rounded-xl bg-gray-700 text-white shadow">
          <h3 class="text-xl font-bold">${blog.title}</h3>
          <p class="py-2">${blog.description}</p>

          <button onclick="deleteBlog('${blog._id}')"
            class="bg-red-500 px-3 py-1 rounded-full mt-2">
            Delete
          </button>
        </div>
      `;
    });

  } catch (err) {
    container.innerHTML = "Server error";
  }
}

// ADD BLOG
async function addBlog() {
  const token = localStorage.getItem("token");
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("desc").value.trim();

  if (!title || !description) {
    alert("Fill blog details");
    return;
  }

  try {
    await fetch(`${API}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";

    getBlogs();
  } catch (err) {
    alert("Failed to add blog");
  }
}

// DELETE BLOG
async function deleteBlog(id) {
  const token = localStorage.getItem("token");

  if (!confirm("Delete this blog?")) return;

  try {
    await fetch(`${API}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    getBlogs();
  } catch (err) {
    alert("Delete failed");
  }
}