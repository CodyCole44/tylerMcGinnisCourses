
const url="https://hacker-news.firebaseio.com/v0/"

async function getTopStories(){
    const response = await fetch(`${url}/topstories.json`)
    return response.json();

}

const url="https://hacker-news.firebaseio.com/v0/"

async function getStories(type){
    const response = await fetch(`${url}/${type}stories.json`)
    return response.json();

}

async function filterStories(type){
    const stories = await getStories(type)
    return stories.slice(0,20)

}

async function getStoryDetails(storyID){
    const response = await fetch(`${url}/item/${storyID}.json`)

    return response.json()
}

async function getAllStoryDetails(type){
    const stories = await filterStories(type);
    const response = await Promise.all(stories.map(story => getStoryDetails(story)))

    return response;
}

async function getTopStories(){
    let response = await getAllStoryDetails('top');

    console.log(response)
    return response;
}

async function getNewStories(){
    let response = await getAllStoryDetails('new');

    console.log(response);
    return response;
}

getTopStories()
getNewStories()

async function filteredTopStories(){
    let stories = await getTopStories();

    return stories.slice(0,20)
}

async function getStoryDetails(storyID){
    const response = await fetch(`${url}/item/${storyID}.json`)

    return response.json()
}

async function getAllStoryDetails(){
    const stories = await filteredTopStories()
    const response = await Promise.all(stories.map(story => getStoryDetails(story)))
    console.log(response)
    return response;
}

async function getNewestStory(){
    const response = await fetch(`${url}/maxitem.json`)
    
    return response.json()
}

async function getTwentyNewestStories(){
    const newest = await getNewestStory();
    let storyAmount = []
    for(let i = newest; i> newest-20;i--){
        storyAmount.push(i)
    }
    const response = await Promise.all(storyAmount.map(story => getStoryDetails(story)))
    let newArr = response.filter(x => x.type=='story')
    console.log(newArr)
    console.log(response);
    
}
let a = async() =>{ 
    console.log("test");
    const response = await getAllStoryDetails();
    console.log(response)
}
getTwentyNewestStories()
getAllStoryDetails()


