const getUser = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users/auth", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
};

export default getUser;
