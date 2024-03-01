const BASE_URL = "http://127.0.0.1:5000/product-api/user";

export async function getAllFeedbacksApi() {
  try {
    const response = await fetch(`${BASE_URL}/getAllProducts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllSuggestedFeedbackApi(
  category: string,
  sortBy: string,
) {
  try {
    let url = `${BASE_URL}/getAllSuggestedProducts`;

    if (category && !sortBy) {
      url = `${url}?category=${category}`;
    }

    if (sortBy && !category) {
      url = `${url}?sortBy=${sortBy}`;
    }

    if (category && sortBy) {
      url = `${url}?category=${category}&sortBy=${sortBy}`;
    }

    console.log(url);

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}