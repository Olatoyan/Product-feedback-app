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

export async function createFeedBackApi({
  title,
  category,
  detail,
}: {
  title: string;
  category: string;
  detail: string;
}) {
  console.log(title, category, detail);
  try {
    const response = await fetch(`${BASE_URL}/createProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category, detail }),
    });

    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
