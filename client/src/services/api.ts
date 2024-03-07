// const BASE_URL = "http://127.0.0.1:5000/product-api/user";
const BASE_URL =
  "https://toyan-product-feedback-app-api.vercel.app/product-api/user";

import Cookie from "js-cookie";

export async function signupApi({
  name,
  username,
  password,
  confirmPassword,
}: {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password, confirmPassword }),
    });

    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }
    Cookie.set("token", data.token);
    Cookie.set("userId", data.data.user._id);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginApi({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }

    console.log(data);
    Cookie.set("token", data?.token);
    Cookie.set("userId", data?.data?.user?._id);
    Cookie.set("userUpvotes", JSON.stringify(data.data.user.upvotedFeedbacks));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logoutApi() {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }
    Cookie.remove("token");
    Cookie.remove("userId");
    Cookie.remove("userUpvotes");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
  createdBy,
}: {
  title: string;
  category: string;
  detail: string;
  createdBy: string;
}) {
  console.log(title, category, detail);
  try {
    const response = await fetch(`${BASE_URL}/createProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category, detail, createdBy }),
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
  userId,
}: {
  id: string;
  comment: string;
  username: string;
  userId: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/replyComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, id, username, userId }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function postCommentApi({
  id,
  comment,
  userId,
}: {
  id: string;
  comment: string;
  userId: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/createComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, id, userId }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function increaseUpvotesApi({
  id,
  user,
}: {
  id: string;
  user: string;
}) {
  try {
    const response = await fetch(`${BASE_URL}/upvoteFeedback?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const data = await response.json();

    Cookie.set("userUpvotes", JSON.stringify(data.user.upvotedFeedbacks));
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
