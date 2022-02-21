/*======= Select Elements ======*/
const entryForm = document.querySelector('.entry-form');
const entriesContainer = document.querySelector('.entries-container');
const clearAll = document.querySelector('.clear-all-btn');

const nameValue = document.querySelector('.preloader-text');
const nameSubBtn = document.querySelector('#name-sub');
const nameSpan = document.querySelector('.name');
const preloaderPage = document.querySelector('.preloader');

const makeEntryPage = document.querySelector('.new-entry');
const createBtn = document.querySelectorAll('.create-entry-btn');
const cancelBtn = document.querySelector('.cancel-entry-btn');
const otherCreateBtn = document.querySelector('.must-go');

const allEntriesBtn = document.querySelector('.all-entries-btn');
const allEntriesPage = document.querySelector('.all-entries');
const exitPageBtn = document.querySelector('.exit-page-btn');

/*====== Add event listeners =======*/
entryForm.addEventListener('submit', addItem);
clearAll.addEventListener('click', clearAllItems);

nameSubBtn.addEventListener('click', ()=>{
    if(!nameValue.value){
        return;
    }
    else{
        addNameToApp(nameValue.value);
        preloaderPage.classList.add('preloader-disappear');
        let name = {name: nameValue.value}
        localStorage.setItem('name',JSON.stringify(name))
    }
})

createBtn.forEach(btn=>(
    btn.addEventListener('click',()=>{
       if(!makeEntryPage.classList.contains('new-entry-visible')){
            makeEntryPage.classList.add('new-entry-visible')
       };
       if(allEntriesPage.classList.contains('show-all-entries')){
           allEntriesPage.classList.remove('show-all-entries')
       }
    })
));

cancelBtn.addEventListener('click',()=>{
    makeEntryPage.classList.remove('new-entry-visible')
})

allEntriesBtn.addEventListener('click',()=>{
    allEntriesPage.classList.add('show-all-entries')
})

exitPageBtn.addEventListener('click',()=>{
    allEntriesPage.classList.remove('show-all-entries')
})
/*======= Functions =======*/
function addItem(e){
    e.preventDefault();
    let form = e.target.children;
    let newDate = form[1].value;
    let newHeading = form[3].value;
    let newEntry = form[5].value;

    let entry = makeElement(newDate,newHeading,newEntry);

    let entries = getLocalStorage();
    setLocalStorage(newHeading,newDate,newEntry,entries);

    form[1].value = '';
    form[3].value = '';
    form[5].value = '';

    if(!clearAll.classList.contains('show-btn')){
        clearAll.classList.add('show-btn');
    }

    makeEntryPage.classList.remove('new-entry-visible');
    otherCreateBtn.style.display = 'none';
};

function makeElement(date,heading,writing){
    let entry = document.createElement('div');
    entry.classList.add('entry');
    entry.innerHTML = `<div class="entry-header">
                        <div>
                            <h1 class="entry-heading">${heading}</h1>
                            <p class="entry-date">${date}</p>
                        </div>
                        <button class="plus-minus-btn">
                            <i class='bx bx-plus-medical'></i>
                            <i class='bx bx-minus'></i>
                        </button>
                        <button class="delete-entry">
                            <i class='bx bxs-trash'></i>
                        </button>
                    </div>
                    <div class="entry-entry">
                        <p>${writing}</p>
                    </div>`;
    const plusMinusBtn = entry.querySelector('.plus-minus-btn');
    const plusBtn = entry.querySelector('.bx-plus-medical');
    const minusBtn = entry.querySelector('.bx-minus');
    const entryEntry = entry.querySelector('.entry-entry');
    const deleteBtn = entry.querySelector('.delete-entry');

    deleteBtn.addEventListener('click', (e)=>{
        let aHeading = e.target.parentElement.parentElement.children[0].children[0].textContent;
        
        let delElement = e.target.parentElement.parentElement.parentElement;
        entriesContainer.removeChild(delElement)
        console.log(delElement)
       
        
        let entries = getLocalStorage();
         if(!entries){
            clearAll.classList.remove('show-btn');
            otherCreateBtn.style.display = 'unset'
        }
        entries = entries.filter(entry=>{
            if(entry.title !== aHeading){
                return entry;
            }
        });
        localStorage.setItem('entries', JSON.stringify(entries))

       
    })

    plusMinusBtn.addEventListener('click', ()=>{
        entryEntry.classList.toggle('show-entry');
        minusBtn.classList.toggle('show-btn');
        plusBtn.classList.toggle('bx-minus');
        
    });
    entriesContainer.appendChild(entry);
}

function clearAllItems(){
    entriesContainer.innerHTML = `<button class="btn btn-clr create-entry-btn">Create Entry</button>`;
    localStorage.removeItem('entries');
    clearAll.classList.remove('show-btn')
}

function loadEntries(){
    let entries = getLocalStorage();
    if (entries){
       for(let i=0; i<entries.length; i++){
            let thisThing = entries[i];
            makeElement(thisThing.date,thisThing.title, thisThing.entry);
            otherCreateBtn.style.display='none';
            clearAll.classList.add('show-btn')
        };
    }
    else{
        return;
    }

    
};

function addNameToApp(name){
    nameSpan.textContent = name;
}

function checkName(){
    if(localStorage.getItem('name')){
        let obj = JSON.parse(localStorage.getItem('name'));
        let val = obj.name;
        console.log(val);
        
        nameSpan.textContent = val;
        preloaderPage.classList.add('preloader-disappear');
    }
    else{
        return;
    }
}

/*======= Local Storage =======*/
function setLocalStorage(title,date,entry,list){
    let newObject = {title,date,entry};
    list.push(newObject);
localStorage.setItem('entries', JSON.stringify(list));
}
function getLocalStorage(){
    return localStorage.getItem('entries')?JSON.parse(localStorage.getItem('entries')):[];
}


/*======= Preloaders =======*/
window.addEventListener('DOMContentLoaded', loadEntries);
window.addEventListener('DOMContentLoaded', checkName);










