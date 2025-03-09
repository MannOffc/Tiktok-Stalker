const input = document.getElementById("inputQuery");
const button = document.getElementById("tombol");
const result = document.getElementById("hasil");

button.addEventListener("click", async () => {
  const username = input.value.trim();
  if (!username)
    return result.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Username cannot be empty!
      </div>
    `;
  try {
    const response = await fetch(`https://api.koboo.my.id/api/stalk/tiktok?username=${username}`);
    const data = await response.json();
    const { uniqueId, nickname, avatarLarger, signature, createTime, verified } = data.result.user;
    const { followerCount, followingCount, heartCount } = data.result.stats;
    result.innerHTML = `
      <div class="card">
        <div class="card-body">
          <p><img src="${avatarLarger}" width="200" /></p>
          <p><h5>${uniqueId}</h5></p>
          <p>Nickname: ${nickname}</p>
          <p>Bio: ${signature}</p>
          <p>Created Time: ${formatDateTime(createTime)}</p>
          <p>Verified: ${verified ? "✅" : "❌"}</p>
          <p>Follower: ${format(followerCount)}</p>
          <p>Following: ${format(followingCount)}</p>
          <p>Like: ${format(heartCount)}</p>
        </div>
      </div>
    `;
  } catch (error) {
    result.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        User "${username}" cannot be found
      </div>
    `;
    console.error(error);
  }
});

function formatDateTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function format(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
}
