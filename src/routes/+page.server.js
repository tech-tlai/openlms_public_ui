import { error, fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, fetch }) => {
    try {
      const formData = await request.formData();
      const enrollmentId = formData.get('enrollmentId');
      const uniqueId = formData.get('password'); // Assuming the name for the unique pin is 'password'
      const rseti = formData.get('rseti');

      // Validate the input fields
      if (!enrollmentId || !uniqueId || rseti === '--- Select RSETI ---') {
        return fail(400, {
          error: 'All fields are required. Please provide valid details.',
          loginDetails: { enrollmentId, uniqueId }
        });
      }

      // Make the API call
      const response = await fetch('http://read-admin-api-dev.ap-south-1.elasticbeanstalk.com/apis/v1/auth/signi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId, uniqueId, rseti })
      });

      if (!response.ok) {
        const responseError = await response.json();
        return fail(response.status, {
          error: responseError.message || 'Invalid credentials.',
          loginDetails: { enrollmentId, uniqueId }
        });
      }


      // Parse the API response
      const result = await response.json();

      // Redirect or handle successful login
      if (result.success) {
        return {
          success: true,
          message: 'Login successful!',
          user: result.user // Include user details if needed
        };
      } else {
        return fail(401, {
          error: result.message || 'Invalid credentials.',
          loginDetails: { enrollmentId, uniqueId }
        });
      }
    } catch (err) {
      throw error(500, 'An unexpected error occurred. Please try again later.');
    }
  }
};
