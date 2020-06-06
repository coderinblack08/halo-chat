const socket = io();
var md = window.markdownit();

new Vue({
    el: '#app',
    data: {
        username: '',
        message: '',
        messages: [],
        joined: false
    },
    mounted() {
        socket.on('chat message', (msg) => {
            const message = {
                username: msg.username,
                message: md.render(msg.message)
            };
            this.messages.push(message);
            const command = msg.message.substring(1,msg.message.length);
            if (command === 'emoji') {
                this.messages.push({
                    username: '🤖 Emoji Bot',
                    message: '🤖 🗣 👋🌈🦄🌟✨✈️💸🔥'
                });
            } else if (command === 'clear') {
                this.messages = [];
            }
        });
    },
    methods: {
        userCreated() {
            if (this.username.trim() === '') {
                alert('🤷‍♂️ Please enter a valid name!');
            } else {
                this.joined = true;
            }
        },
        send() {
            const message = {
                username: this.username,
                message: this.message
            };
            socket.emit('chat message', message);
            this.message = '';
        }
    }
});