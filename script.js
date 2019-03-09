

let app = new Vue({
  el: '#app',
  data: {
    number: '',
    current: {
      title: '',
      img: '',
      num: '',
    },
    loading:true,
    addedName: '',
    addedComment: '',
    comments: {},
    votes: {},
  },

  created() {
    this.number = 1;
    this.contender();
  },

  methods: {
    async contender() {
      try {
        this.loading = true;
        this.current.num = this.number;
        this.current.img = "images/iron_throne_"+this.current.num+".jpg"
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    previousContender() {
      this.number = this.current.num - 1;
      if (this.number < 1)
        this.number = 20;
    },
    nextContender() {
      this.number = this.current.num + 1;
      if (this.number > 20)
        this.number = 1;
    },
    getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomContender() {
      this.number = this.getRandom(1, 20);
    },
    addComment() {
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);

      this.comments[this.number].push({
        author: this.addedName,
        text: this.addedComment,
      });
      this.addedName = '';
      this.addedComment = '';
    },
    voteYes() {
      if (!(this.number in this.votes)) {
        Vue.set(app.votes, this.number, new Array);
        this.votes[this.number] = ({
          yes: 0,
          no: 0,
          maybe: 0,
          total:0,
        });}

        console.log(this.votes[this.number].yes);
        console.log(this.votes[this.number].total);
      this.votes[this.number].yes += 1;
      this.votes[this.number].total += 1;
      console.log(this.votes[this.number].yes);
      console.log(this.votes[this.number].total);
    },
    voteNo() {
      if (!(this.number in this.votes)) {
        Vue.set(app.votes, this.number, new Array);
        this.votes[this.number] = ({
          yes: 0,
          no: 0,
          maybe: 0,
          total: 0,
        });}

      this.votes[this.number].no++;
      this.votes[this.number].total++;
    },
    voteMaybe() {
      if (!(this.number in this.votes)) {
        Vue.set(app.votes, this.number, new Array);
        this.votes[this.number] = ({
          yes: 0,
          no: 0,
          maybe: 0,
          total: 0,
        });}

      this.votes[this.number].maybe++;
      this.votes[this.number].total++;
    },
  },

  computed: {
      quote() {
        var quote = new Array;
        quote[0] = "My reign has just begun.";
        quote[1] = "We know no king, but the King in the North.";
        quote[2] = "Long may she reign.";
        quote[3] = "There are no men like me. Only me.";
        quote[4] = "Never forget who you are. The rest of the world will not.";
        quote[5] = "The North remembers.";
        quote[6] = "The lone wolf dies, but the pack survives.";
        quote[7] = "I'm the Three Eyed Raven now.";
        quote[8] = "This goes beyond houses and honor and oaths.";
        quote[9] = "We have to fight, and we need to do it together.";
        quote[10] = "There's only one reward I want.";
        quote[11] = "Unsullied fear nothing.";
        quote[12] = "No one can survive in this world without help.";
        quote[13] = "The night is dark and full of terrors.";
        quote[14] = "She's the queen we chose.";
        quote[15] = "I'm tired of reading about the achievements of better men.";
        quote[16] = "I always wanted to do the right thing.";
        quote[17] = "I don't believe in saviors.";
        quote[18] = "You know who's coming for you. You've always known.";
        quote[19] = "Fear is for the winter.";
        return quote[this.number - 1];
      },

      name() {
        var name = new Array;
        name[0] = "Daenerys Targaryen";
        name[1] = "Jon Snow";
        name[2] = "Cersei Lannister";
        name[3] = "Jaime Lannister";
        name[4] = "Tyrion Lannister";
        name[5] = "Arya Stark";
        name[6] = "Sansa Stark";
        name[7] = "Bran Stark";
        name[8] = "Brienne of Tarth";
        name[9] = "Ser Davos Seaworthy";
        name[10] = "Euron Greyjoy";
        name[11] = "Grey Worm";
        name[12] = "Ser Jorah Mormont";
        name[13] = "Melisandre";
        name[14] = "Missandei";
        name[15] = "Samwell Tarley";
        name[16] = "Theon Greyjoy";
        name[17] = "Varys";
        name[18] = "The Hound";
        name[19] = "The Night King";
        return name[this.number - 1];
      },
      yesPercent() {
        var quotient = 0;
        if((this.number in this.votes)) {
          quotient = this.votes[this.number].yes/this.votes[this.number].total;
        }

        var percent = quotient * 100;
        return percent.toFixed(0);
      },
      noPercent() {
        var quotient = 0;
        if((this.number in this.votes)) {
          quotient = this.votes[this.number].no/this.votes[this.number].total;
        }

        var percent = quotient * 100;
        return percent.toFixed(0);
      },
      maybePercent() {
        var quotient = 0;
        if((this.number in this.votes)) {
          quotient = this.votes[this.number].maybe/this.votes[this.number].total;
        }

        var percent = quotient * 100;
        return percent.toFixed(0);
      },
  },

  watch: {
    number(value, oldvalue) {
      if (oldvalue === '') {
        this.max = value;
      } else {
        this.contender();
      }
    },
  },
});
