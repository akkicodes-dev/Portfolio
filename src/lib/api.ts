export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

/**
 * Submits contact form payload.
 * [TODO_BACKEND]: Wire to production backend API once deployed.
 * Currently simulates the async endpoint with validated response states.
 */
export const submitContact = async (payload: ContactPayload): Promise<ApiResponse> => {
  // Simulate realistic network latency
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Basic validation check
  if (!payload.name || !payload.email || !payload.message) {
    return {
      success: false,
      message: 'All fields are required. Please check your inputs.',
    };
  }

  // Placeholder simulated API endpoint
  try {
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    // return await response.json();

    return {
      success: true,
      message: 'Message delivered! Akash will get back to you shortly.',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Could not connect to service. Please email akashsatao2303@gmail.com directly.',
    };
  }
};
