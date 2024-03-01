const BASE_URL = "http://127.0.0.1:5000/product-api/user";

export async function getAllFeedbackApi(category: string, sortBy: string) {
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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
