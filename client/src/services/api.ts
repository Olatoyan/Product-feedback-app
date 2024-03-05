// const BASE_URL = "http://127.0.0.1:5000/product-api/user";
const BASE_URL =
  "https://toyan-product-feedback-app-api.vercel.app/product-api/user";

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

export async function getProductApi(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/getProduct?id=${id}`);
    const data = await response.json();
    console.log(data);
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

export async function deleteFeedbackApi(id: string) {
  try {
    await fetch(`${BASE_URL}/deleteProduct?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editFeedbackApi({
  title,
  category,
  detail,
  status,
  id,
}: {
  title: string;
  category: string;
  detail: string;
  status: string;
  id: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/editProduct?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category, detail, status }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postReplyApi({
  id,
  comment,
  username,
}: {
  id: string;
  comment: string;
  username: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/replyComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, id, username }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function postCommentApi({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/createComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, id }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function increaseUpvotesApi(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/increaseUpvotes?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function deleteCommentApi(id: string) {
  try {
    await fetch(`${BASE_URL}/deleteComment?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteReplyApi(id: string) {
  try {
    await fetch(`${BASE_URL}/deleteReply?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editCommentApi({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/editComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, comment }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function editReplyApi({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/editReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, comment }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
