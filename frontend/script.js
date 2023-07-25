
// Sample data for posts
const postsData = [
  {
    fullName: 'John Doe',
    avatar: './images/User-avatar.png',
    postDate: 'July 6, 2023',
    content: 'This is a sample post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: './images/download-image.png',
  },
 // Add more posts...
];

// Sample data for user profile
const userProfileData = {
  fullName: 'User Full Name',
  avatar: './images/User-avatar.png',
  email: 'user@example.com',
};

// Function to create a post element
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.className = 'all-posts';

  const postHeader = document.createElement('div');
  postHeader.className = 'post-header';

  const userAvatar = document.createElement('img');
  userAvatar.src = post.avatar;
  userAvatar.alt = 'User Avatar';
  postHeader.appendChild(userAvatar);

  const postInfo = document.createElement('div');
  postInfo.className = 'post-info';

  const userName = document.createElement('h3');
  userName.textContent = post.fullName;
  postInfo.appendChild(userName);

  const postDate = document.createElement('span');
  postDate.className = 'post-date';
  postDate.textContent = post.postDate;
  postInfo.appendChild(postDate);

  postHeader.appendChild(postInfo);
  postElement.appendChild(postHeader);

  const postContent = document.createElement('div');
  postContent.className = 'post-content';

  const postText = document.createElement('p');
  postText.textContent = post.content;
  postContent.appendChild(postText);

  if (post.image) {
    const postImage = document.createElement('img');
    postImage.src = post.image;
    postImage.alt = 'Post Image';
    postContent.appendChild(postImage);
  }

  postElement.appendChild(postContent);

  const postActions = document.createElement('div');
  postActions.className = 'post-actions';

  const likeButton = document.createElement('button');
  likeButton.className = 'like-button';
  likeButton.textContent = 'Like';
  postActions.appendChild(likeButton);

  const dislikeButton = document.createElement('button');
  dislikeButton.className = 'dislike-button';
  dislikeButton.textContent = 'Dislike';
  postActions.appendChild(dislikeButton);

  const commentButton = document.createElement('button');
  commentButton.className = 'comment-button';
  commentButton.textContent = 'Comment';
  postActions.appendChild(commentButton);

  postElement.appendChild(postActions);

  return postElement;
}

// Function to create user profile element
function createUserProfileElement(userProfile) {
  const userProfileElement = document.createElement('div');
  userProfileElement.className = 'user-info';

  const userAvatar = document.createElement('img');
  userAvatar.src = userProfile.avatar;
  userAvatar.alt = 'User Avatar';
  userProfileElement.appendChild(userAvatar);

  const userDetails = document.createElement('div');
  userDetails.className = 'user-details';

  const userName = document.createElement('h3');
  userName.textContent = userProfile.fullName;
  userDetails.appendChild(userName);

  const userEmail = document.createElement('p');
  userEmail.textContent = userProfile.email;
  userDetails.appendChild(userEmail);

  userProfileElement.appendChild(userDetails);

  return userProfileElement;
}

// Get the post list and user profile section elements from the DOM
const postList = document.getElementById('post-list');
const userProfileSection = document.getElementById('user-profile');

// Dynamically inject posts into the DOM
postsData.forEach((post) => {
  const postElement = createPostElement(post);
  postList.appendChild(postElement);
});

// Dynamically inject user profile into the DOM
const userProfileElement = createUserProfileElement(userProfileData);
userProfileSection.insertBefore(userProfileElement, userProfileSection.firstChild);