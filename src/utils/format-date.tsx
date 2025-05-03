const formatDate = (data: string) => {
  const formattedDate = new Date(data).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};

export default formatDate;
