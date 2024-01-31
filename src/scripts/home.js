import { createPost, getPosts, getProfile, patchPost, deletePost } from "./api.js";

const renderProfile = async () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const profile = await getProfile(token.token);
  // console.log(profile)

  const imageProfile = document.querySelector(".image__profile");
  imageProfile.setAttribute("src", `${profile.avatar}`)

}

renderProfile();

const renderPosts = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const posts = await getPosts(token.token);
  const profile = await getProfile(token.token);
  const postsContainer = document.querySelector("#posts");

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


  posts.forEach(post => {
    let limitedContent = post.content.substring(0, 145) + "...";
    let date = new Date(post.createdAt);
    let formattedDate = `${months[date.getMonth()]} ${date.getFullYear()}`;

    if (post.user.id === profile.id) {
      postsContainer.insertAdjacentHTML("beforeend",
        `
      <div class="post__container">
        <div class="profile__container">
          <div class="profile__title"> 
            <img class="post__profile" src=${post.user.avatar}>
            <p>${post.user.username} | ${formattedDate}</p>
          </div>
          <div class="buttons__container">
            <button class="redirect-edit__button edit__button" data-id=${post.id}>Editar</button>
            <button class="close-cancel__button delete__button" data-id=${post.id}>Excluir</button>
          </div>
        </div>
        <h2>${post.title}</h2> 
        <p class="post__content">${limitedContent}</p>
        <a>Acessar Publicação</a>
      </div>
    `)
    }
    else {
      postsContainer.insertAdjacentHTML("beforeend",
        `
      <div class="post__container">
        <div class="profile__container">
          <div class="profile__title">
            <img class="post__profile" src=${post.user.avatar}>
            <p>${post.user.username} | ${formattedDate}</p>
          </div>
        </div>
        <h2>${post.title}</h2> 
        <p class="post__content">${limitedContent}</p>
        <a>Acessar Publicação</a>
      </div>
    `)
    }
  })

}
renderPosts();


const handleModal = () => {
  const button = document.querySelector("#createPost");
  const modalContainer = document.querySelector("#postModalController");

  button.addEventListener("click", () => {
    modalContainer.showModal();
    closeModal();
  })
}
handleModal();

const closeModal = () => {
  const button = document.querySelector("#closeModal");
  const modalContainer = document.querySelector("#postModalController");

  button.addEventListener("click", () => {
    modalContainer.close();
  })
}

const sendPostData = () => {
  const postTitle = document.querySelector("#postTitle").value;
  const postContent = document.querySelector("#postContent").value;

  return {
    title: `${postTitle}`,
    content: `${postContent}`
  }
}

const postValidator = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log(token.token)
    const postData = sendPostData();
    const post = await createPost(token.token, postData)
    console.log(post)

    if (post.title) {
      alert("OK")
    }

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const sendPost = document.querySelector("#sendPost");
sendPost.addEventListener("click", () => {
  postValidator();
})

const logoutValidator = async () => {
  const profile = document.querySelector("#profile");
  const token = JSON.parse(localStorage.getItem("token"));
  const profileContent = await getProfile(token.token);


  profile.insertAdjacentHTML("beforeend",
    `
    <div>
      <p>@${profileContent.username}</p>
      <p>Sair da conta</p>
    </div>
  `
  )
}

const imageProfile = document.querySelector(".image__profile");
// console.log(imageProfile)
imageProfile.addEventListener("click", () => {
  logoutValidator();
})

window.onload = () => {
  const postsContainer = document.querySelector("#posts");
  const editModalContainer = document.querySelector("#editModalController");
  const deleteModalContainer = document.querySelector("#deleteModalController");

  postsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit__button")) {
      editModalContainer.showModal();
      closeEditModal();
    }
    if (event.target.classList.contains("delete__button")) {
      deleteModalContainer.showModal();
      closeDeleteModal();
    }
  });
}

const closeEditModal = () => {
  const button = document.querySelector("#closeEditModal");
  const modalContainer = document.querySelector("#editModalController");

  button.addEventListener("click", () => {
    modalContainer.close();
  })
}

const closeDeleteModal = () => {
  const closeButton = document.querySelector("#closeDeleteModal");
  const deleteModalContainer = document.querySelector("#deleteModalController");

  closeButton.addEventListener("click", () => {
    deleteModalContainer.close();
  })
}

let currentPostId = null;

const getEditValues = async () => {
  const editTitle = document.querySelector("#editTitle");
  const editContent = document.querySelector("#editContent");
  const token = JSON.parse(localStorage.getItem("token"));
  const profile = await getProfile(token.token);
  const posts = await getPosts(token.token);

  const editButtons = [...document.querySelectorAll(".edit__button")];

  editButtons.forEach(button => {
    button.addEventListener("click", () => {
      const postId = button.getAttribute("data-id");
      const post = posts.find(post => post.id === postId);
      if (post.user.id === profile.id) {
        editTitle.setAttribute("value", `${post.title}`);
        editContent.textContent = `${post.content}`;
        currentPostId = postId;
      }
    })
  })
}
getEditValues()

const sendEditPost = () => {
  const title = document.querySelector("#editTitle").value;
  const content = document.querySelector("#editContent").value;

  return {
    title: `${title}`,
    content: `${content}`
  }
}

const editPost = document.querySelector("#editPost");

editPost.addEventListener("click", async () => {
  if (currentPostId) {
    const data = sendEditPost();
    const token = JSON.parse(localStorage.getItem("token")).token;
    const updatePost = await patchPost(currentPostId, token, data);
    console.log(updatePost)

  }
})

const getDeletePost = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const profile = await getProfile(token.token);
  const posts = await getPosts(token.token);

  const deleteButtons = [...document.querySelectorAll(".delete__button")];

  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const postId = button.getAttribute("data-id");
      const post = posts.find(post => post.id === postId);
      if (post.user.id === profile.id) {
        currentPostId = postId;
      }
    })
  })
}

getDeletePost();

const deleteButton = document.querySelector("#deletePost");

deleteButton.addEventListener("click", async () => {
  if (currentPostId) {
    const token = JSON.parse(localStorage.getItem("token")).token;
    const post = await deletePost(currentPostId, token);
    console.log(post)
  }
})