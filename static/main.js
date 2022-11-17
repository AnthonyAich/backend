const socket = io("/");
const main__chat__window = document.getElementById("main__chat_window");
const videoGrids = document.getElementById("video-grids");
const myVideo = document.createElement("video");
const chat = document.getElementById("chat");
OtherUsername = "";
chat.hidden = true;
myVideo.muted = true;

let peer = new Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "",
});

let myVideoStream;

const peers = {};
let getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

sendmessage = (text) => {
    if (event.key === "Enter" && text.value != "") {
        socket.emit("messagesend", myname + ' : ' + text.value);
        text.value = "";
        main__chat_window.scrollTop = main__chat_window.scrollHeight;
    }
};

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
})
    .then((stream) => {
        myVideoStream = stream;
        addVideoStream(myVideo, stream, myname);

        socket.on("user-connected", (id, username) => {
            console.log("userid:" + id);
            connectToNewUser(id, stream, username);
            socket.emit("tellName", myname);
        });

        socket.on("user-disconnected", (id) => {
            if (peers[id]) peers[id].close();
        });
    });
peer.on("call", (call) => {
    getUserMedia({ video: true, audio: true },
        function (stream) {
            call.answer(stream); // Answer the call with an A/V stream.
            const video = document.createElement("video");
            call.on("stream", function (remoteStream) {
                addVideoStream(video, remoteStream, OtherUsername);
            });
        },
        function (err) {
            console.log("Failed to get local stream", err);
        }
    );
});

peer.on("open", (id) => {
    socket.emit("join-room", roomId, id, myname);
});

socket.on("createMessage", (message) => {
    let ul = document.getElementById("messageadd");
    let li = document.createElement("li");
    li.className = "message";
    li.appendChild(document.createTextNode(message));
    ul.appendChild(li);
});

socket.on("AddName", (username) => {
    OtherUsername = username;
    console.log(username);
});

const RemoveUnusedDivs = () => {
    //
    alldivs = videoGrids.getElementsByTagName("div");
    for (let i = 0; i < alldivs.length; i++) {
        e = alldivs[i].getElementsByTagName("video").length;
        if (e == 0) {
            alldivs[i].remove();
        }
    }
};

const connectToNewUser = (userId, streams, myname) => {
    const call = peer.call(userId, streams);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
        //       console.log(userVideoStream);
        addVideoStream(video, userVideoStream, myname);
    });
    call.on("close", () => {
        video.remove();
        RemoveUnusedDivs();
    });
    peers[userId] = call;
};

const cancel = () => {
    const modal = document.getElementById("getCodeModal");
    if (modal.style.display == "none") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
};

const copy = async () => {
    const roomid = document.getElementById("roomid").innerText;
    await navigator.clipboard.writeText("https://web3node.herokuapp.com/join/" + roomid);
};

const invitebox = () => {
    const modal = document.getElementById("getCodeModal");
    if (modal.style.display == "none") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
};

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        document.getElementById("microphoneIcon").classList.remove("fa-microphone");
        document.getElementById("microphoneIcon").classList.add("fa-microphone-slash");
        document.getElementById("mic").style.color = "red";
    } else {
        document.getElementById("microphoneIcon").classList.remove("fa-microphone-slash");
        document.getElementById("microphoneIcon").classList.add("fa-microphone");
        document.getElementById("mic").style.color = "white";
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
};

const VideomuteUnmute = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        document.getElementById("videoIcon").classList.remove("fa-video");
        document.getElementById("videoIcon").classList.add("fa-video-slash");
        document.getElementById("video").style.color = "red";
    } else {
        document.getElementById("videoIcon").classList.remove("fa-video-slash");
        document.getElementById("videoIcon").classList.add("fa-video");
        document.getElementById("video").style.color = "white";

        myVideoStream.getVideoTracks()[0].enabled = true;

    }
};

const addVideoStream = (videoEl, stream, name) => {
    videoEl.srcObject = stream;
    videoEl.addEventListener("loadedmetadata", () => {
        videoEl.play();
    });
    const h1 = document.createElement("h1");
    const h1name = document.createTextNode(name);
    h1.appendChild(h1name);
    const videoGrid = document.createElement("div");
    videoGrid.classList.add("video-grid");
    videoGrid.appendChild(h1);
    videoGrids.appendChild(videoGrid);
    videoGrid.append(videoEl);
    RemoveUnusedDivs();
    let totalUsers = document.getElementsByTagName("video").length;
    if (totalUsers > 1) {
        for (let index = 0; index < totalUsers; index++) {
            document.getElementsByTagName("video")[index].style.width =
                100 / totalUsers + "%";

            document.getElementsByTagName("video")[0].style.width = "auto";
            document.getElementsByTagName("video")[0].style.height = "auto";

            document.getElementById("video-grids").style.height = "auto";
            document.getElementById("video-grids").style.width = "auto";
            document.querySelector(".video-grid").style.display = "flex";


            document.querySelector("video").style.maxWidth = "600px";
            document.querySelector("video").style.maxHeight = "auto";
            document.querySelector("video").style.display = "block";
        }
    } else {
        document.getElementsByTagName("video")[0].style.width = "100%";
        document.getElementsByTagName("video")[0].style.height = "100%";

        document.getElementById("video-grids").style.height = "100%";
        document.getElementById("video-grids").style.width = "100%";
        document.querySelector(".video-grid").style.display = "block";


        document.querySelector("video").style.maxWidth = "100%";
        document.querySelector("video").style.maxHeight = "70%";
        document.querySelector("video").style.display = "block";
    }
};
