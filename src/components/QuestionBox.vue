<template>
    <div class="question-box-container">
        <b-jumbotron>

            <template #lead>
            {{ currentQuestion.question}}
            </template>

            <hr class="my-4">

            <b-list-group>
                <b-list-group-item
                    v-for="(anwser, index) in anwsers" :key="index"
                    @click="selectAnwser(index)"
                    :class=" anwserClass(index)"
                >
            {{ anwser }}
                </b-list-group-item>
            </b-list-group>

            <b-button 
                variant="primary"
                v-on:click="submitAnwser()"
                :disabled='selectedIndex === null || answered'
            >
                Submit
            </b-button>
            <b-button @click="next" variant="success">
                Next
            </b-button>
        </b-jumbotron>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        currentQuestion: Object,
        next: Function,
        increment: Function
    },
    data: function() {
        return {
            selectedIndex: null,
            correctIndex: null,
            shuffledAnswers: [],
            answered: false
        }
    },
    computed:{
        anwsers(){
            let anwsers = [...this.currentQuestion.incorrect_answers]
            anwsers.push(this.currentQuestion.correct_answer)
            return anwsers
        }
    },
    watch: {
        currentQuestion: {
            immediate : true,
            handler() {
                this.selectedIndex = null
                this.answered = false
                this.shuffleAnswer()
            }
        }
    },
    methods:{
        selectAnwser(index) {
            this.selectedIndex = index
        },
        shuffleAnswer() {
            let anwsers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
            this.shuffledAnswers = _.shuffle(anwsers)
            this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
        },
        submitAnwser() {
            let isCorrect = false

            if (this.selectedIndex == this.correctIndex){
                isCorrect = true
            }

            this.answered = true
            this.increment(isCorrect)
        },
        anwserClass(index) {
            let anwserClass = ''

            if (!this.answered && this.selectedIndex === index){
                anwserClass = 'selected'
            } else if (this.answered && this.correctIndex === index) {
                anwserClass = 'correct'
            } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
                anwserClass = 'incorrect'
            }

            return anwserClass
        }
    },
    mounted(){
        console.log(this.currentQuestion)
    }
}
</script>

<style scoped>
.list-group {
    margin-bottom: 15px;
}

.list-group-item:hover { 
    background: #EEEE; 
    cursor: pointer;
}

.btn {
    margin: 0 5px;
}

.selected {
    background-color: lightblue;
}

.correct {
    background-color: lightgreen;
}

.incorrect {
    background-color: red;
}

</style>