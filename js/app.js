const app = new Vue({
  el: "#app",
  data: {
    message: "Hello OpenClassrooms!", // String
    answerToLife: 42, // Number
    groceries: ["Apples", "Bananas", "Coconuts"], // Arrays
    costOfApples: 10,
    costOfBananas: 2,
    costOfCoconuts: 8,
    timeForLunch: false, // Boolean
  },
  computed: {
    totalPrice() {
      return this.costOfApples + this.costOfBananas + this.costOfCoconuts;
    },
  },
});
