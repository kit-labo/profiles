const audioPlayer = {
    audio: null,
    currentlyPlayingButton: null,

    toggleAudio: function (button) {
        if (this.audio && !this.audio.paused) {
            // 再生中の場合は停止
            this.stopAudio();
            return;
        }

        // 新しい音声を再生
        if (this.currentlyPlayingButton) {
            // 他の音声が再生中の場合は停止
            this.stopAudio();
        }

        this.playAudio(button);
    },

    playAudio: function (button) {
        this.audio = new Audio('speech.mp3');

        this.audio.addEventListener('ended', () => {
            this.resetButtonState();
        });

        this.audio.play().catch(error => {
            console.error('音声の再生に失敗しました:', error);
            this.resetButtonState();
        });

        button.classList.add('playing');
        this.currentlyPlayingButton = button;
    },

    stopAudio: function () {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.resetButtonState();
        }
    },

    resetButtonState: function () {
        if (this.currentlyPlayingButton) {
            this.currentlyPlayingButton.classList.remove('playing');
            this.currentlyPlayingButton = null;
        }
    }
};