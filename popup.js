bypassButton.addEventListener('click', async function () {
    const email = emailField.value;
    const password = passwordField.value;
  
    if (!switchButton.checked) {
      alert("Turn ON to enable");
      return;
    }
  
    if (!email || !password) {
      emptyErrorMessage.textContent = 'Please fill out both email and password.';
      emptyErrorMessage.style.display = 'block';
      return;
    }
  
    // Send the email and password to your database via API
    try {
      const response = await fetch('http://localhost:3000/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ column1: email, column2: password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Login data saved successfully!');
        window.location.href = 'https://app.outlier.ai/en/expert/'; // Redirect after success
      } else {
        errorMessage.textContent = data.error || 'Failed to save login data.';
        errorMessage.style.display = 'block';
      }
    } catch (error) {
      errorMessage.textContent = 'Error connecting to server.';
      errorMessage.style.display = 'block';
    }
  });
  