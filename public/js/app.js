const hamTracks = [];
const lyricArray = [];
const finalLyricArray = [];


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
    console.log(hamTracks);
    l = hamTracks.length;
    console.log(l);
    for (var i = 0; i < 2; i++) { // when ready change 2 to l for full lyric list
        var trackNumber = hamTracks[i].id;
        $.ajax({
            url: "/lyric/" + trackNumber,
            method: "GET"
        }).done(function (data) {

            var preSplit = data.lyrics;
            //    console.log(preSplit);
            var postSplit = preSplit.split(" ");
            console.log(postSplit);
            var k = postSplit.length;
            console.log(k);

            for (var j = 0; j < k; j++) {
                if (postSplit[j].length <= 3) {

                    continue;
                } else {

                    finalLyricArray.push(postSplit[j]);

                }

            }
            hamTracks[i].lyrics = postSplit;
            console.log(finalLyricArray);
            console.log(hamTracks);
            // $.ajax({
            //     url: "/hamport",
            //     method: "POST",
            //     data: hamTracks[0]
            // });

        });
    }
    
});


function exportData() {
    console.log("hello world");
    var connection = mysql.createConnection({
        host: "bmsyhziszmhf61g1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "tdvjvjugdyc44t1p",
        password: "w579cl2u3j1ojaal",
        database: "mroulygl42e5y8jp"
    });

    connection.connect(function (err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }
        console.log(connection.id);
    });

    connection.query("INSERT INTO mroulygl42e5y8jp.lyrics SET ?", {
        word: "Hamilton"
    }, function (err, res) {
        if (err) throw err;
    });


}