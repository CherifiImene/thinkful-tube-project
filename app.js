const YOUTUBE_END_POINT = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(searchTerm , callback){
    const settings ={
        url : YOUTUBE_END_POINT,
        data : {
            part : 'snippet',
            key : 'AIzaSyDp6GqDnV0luhPdipKWBS7oSVCaDb87kBQ',
            q : searchTerm
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);
}
function renderVideo(result){
    let ID = result.id.videoId ;
    let thumbnail = result.snippet.thumbnails.medium.url;
    let title =  result.snippet.title;
    let channel = result.snippet.channelTitle;
    let channelID = result.snippet.channelId;
    return `<div class="item">
    <a href="https://www.youtube.com/watch?v=${ID}"><img src=${thumbnail} alt=""></a>
    <h4>${title}</h4>
    <a href ="https://www.youtube.com/channel/${channelID}" ><span>${channel}</span></a>
    </div>`;
}
function displayData(data){
    let videos = data.items.map((item,index)=>renderVideo(item));
    $('.js-display-result').html(videos);
}
$(function(){
    $('.js-form').submit(event =>{
    event.preventDefault();
    let searchTerm = $(this).find('#search-tab').val();
    getDataFromApi(searchTerm,displayData);

});
});
