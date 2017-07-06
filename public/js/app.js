const hamTracks = [];
const lyricArray = [];


$.get("/api/tracklist", function (data) {
    var l;
    var n = data.tracklist.length;
    for (var i = 0; i < n; i++) {
        var title;
        var songId;
        var lyric;
        var track = {
            title: data.tracklist[i].title,
            id: data.tracklist[i].id,
            lyrics: lyric
        };
        hamTracks.push(track);
    }
    l = hamTracks.length;
    console.log(l);
    for (var i = 0; i < 1; i++) { // when ready change 2 to l for full lyric list
        var trackNumber = hamTracks[i].id;
        $.ajax({
            url: "/lyric/" + trackNumber,
            method: "GET"
        }).done(function (data) {

            lyricArray.push(data.lyrics);
            console.log(lyricArray);

        });
    }

});