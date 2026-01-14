const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value; // diner or restaurant

  // 1️⃣ Sign up user (client-side is safe)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert('Error creating account: ' + error.message);
    return;
  }

  // 2️⃣ Call secure Edge Function to assign role
  const res = await fetch('https://<your-function-url>', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: data.user.id, role })
  });

  const result = await res.json();

  if (result.error) {
    alert('Failed to assign role: ' + result.error);
    return;
  }

  alert('Account created! Check your email to confirm.');

  // 3️⃣ Redirect to correct dashboard
  if (role === 'diner') {
    window.location.href = '/diner-dashboard.html';
  } else {
    window.location.href = '/restaurant-dashboard.html';
  }
});

