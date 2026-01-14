document.addEventListener("DOMContentLoaded", () => {
  const sections = ["about", "discover", "faq", "login"];
  const navLinks = document.querySelectorAll(".nav-links a");

  function setActiveSection() {
    const scrollPosition = window.scrollY + 120;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const { offsetTop, offsetHeight } = element;

      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.dataset.section === section
          );
        });
        break;
      }
    }
  }

  window.addEventListener("scroll", setActiveSection);
});
const signupForm = document.getElementById('diner-signup-form');
const messageDiv = document.getElementById('signup-message');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('diner-email').value;
  const password = document.getElementById('diner-password').value;

  // 1️⃣ Sign up user
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    messageDiv.innerText = 'Error: ' + error.message;
  } else {
    messageDiv.innerText = 'Signup successful! Check your email for confirmation.';
    console.log('User ID:', data.user.id);
  }
});
const loginForm = document.getElementById('diner-login-form');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    loginMessage.innerText = 'Error: ' + error.message;
  } else {
    loginMessage.innerText = 'Login successful!';
    console.log('Logged in user:', data.user);

    // Redirect to diner dashboard (we’ll create this next)
    window.location.href = 'diner-dashboard.html';
  }
});

