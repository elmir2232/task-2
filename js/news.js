"use strict";
const addButton = document.querySelector(".js-btn-addNew");
const overlay = document.querySelector(".js-overlay");
const popupClose = document.querySelector(".js-popup-close");
const popupSave = document.querySelector(".js-btn-articleSave");
const articlePopupHeader = document.querySelector(".js-popup-article-header");
const articlePopupContent = document.querySelector(".js-popup-article-content");
const popupSaveEdit = document.querySelector(".js-btn-edit");
const logOutBtn = document.querySelector(".js-logOut");
const eventClick = 'click';
const dsFlex = 'flex';
const dsNone = 'none';
let editID;
window.onload = function(){

function articleRender() {
  let allArticles = document.querySelector(".js-articles");
  allArticles.innerHTML = '';
  
  for (let i = 0; i < articlesData.length; i++) {

      const articleLAyout = 
      `
      <div class="article" data-id="${articlesData[i].id}">
          <h1 class="article-header">${articlesData[i].title}</h1>
          <p class="article-content">${articlesData[i].content}</p>
              <div class="article-action admin">
                  <i class="icon icon-pen"></i>
                  <i class="icon icon-deleteArticle"></i>
              </div>
      </div>
      `;
      allArticles.insertAdjacentHTML('afterbegin',articleLAyout);
      localStorage.setItem('articleSeq',JSON.stringify(articlesData));
      const editArticleBtn = document.querySelector('.icon-pen');
      editArticleBtn.addEventListener(eventClick,editArticle);
      const deleteArticleBtn = document.querySelector('.icon-deleteArticle');
      deleteArticleBtn.addEventListener(eventClick,deleteArticle);

  }
}

function savingDataOfArticle(){
  let article = {};
  let i = articlesData.length;

  article.id = i;
  article.title = ""+articlePopupHeader.value;
  article.content = ""+articlePopupContent.value;
  
  localStorage.setItem('article'+article.id, JSON.stringify(article));
  articlesData.push(JSON.parse(localStorage.getItem('article'+i)));
}

function savingNews(){
  if(articlePopupHeader.value =='' || articlePopupContent.value ==''){
      overlay.style.display = dsNone;
  }else{
      savingDataOfArticle();
      articleRender();
      overlay.style.display = dsNone;
  }
}

function findIndexChoosenElement(id){
  return articlesData.findIndex(x => x.id == id);
}

function editArticle(){
  const editBtn = this;
  const parentOfEditBtn = editBtn.closest('.article');
  console.log(parentOfEditBtn.dataset.id)
  const idParent = parentOfEditBtn.dataset.id;
  popupSaveEdit.style.display = "block";
  popupSave.style.display = dsNone;
  let Id = findIndexChoosenElement(idParent);
  console.log(Id);
  articlePopupHeader.value = articlesData[Id].title;
  articlePopupContent.value = articlesData[Id].content;
  overlay.style.display = dsFlex;
  editID = Id;
}

function deleteArticle(){
  const editBtn = this;
  const parentOfEditBtn = editBtn.closest('.article');
  const idParent = parentOfEditBtn.dataset.id;
  let Id = findIndexChoosenElement(idParent);
   console.log(Id);
  articlesData.splice(Id,1);
  localStorage.removeItem("article"+Id)
  localStorage.removeItem("articleSeq")

  articleRender();
}

function logOut(){
  document.location.assign('index.html');
	localStorage.removeItem("isAdmin");
}

function chooseUserRole(){
  let role = localStorage.getItem('isAdmin'),
  articleActions = document.querySelectorAll('.article-action');
  console.log(role)
  if(role === "false"){
      addButton.style.display = dsNone;
      for (let i=0; i<articleActions.length;i++){
          articleActions[i].style.display = dsNone;
      }
  }
  else if(role===null){
    let err =document.querySelector(".js-header__err").innerHTML= "PLEASE LOG IN";
    
    addButton.style.display = dsNone;
      for (let i=0; i<articleActions.length;i++){
          articleActions[i].style.display = dsNone;
      }
      document.querySelector('.js-logOut').style.display= dsNone;
  }
  
}
    
    let articlesData = localStorage.getItem('articleSeq') ? JSON.parse(localStorage.getItem('articleSeq')):[];
    articleRender();
    chooseUserRole();

    addButton.addEventListener(eventClick ,function(){
        overlay.style.display = dsFlex;
    });
    
    popupClose.addEventListener(eventClick,function(){
        overlay.style.display = dsNone;
    });

    popupSave.addEventListener(eventClick,savingNews);

    logOutBtn.addEventListener(eventClick,logOut);

    popupSaveEdit.addEventListener(eventClick,function(){
        articlesData[editID].title = articlePopupHeader.value;
        articlesData[editID].content = articlePopupContent.value;
        localStorage.setItem('articleSeq',JSON.stringify(articlesData));
        overlay.style.display = dsNone;
        articleRender();
    });
}