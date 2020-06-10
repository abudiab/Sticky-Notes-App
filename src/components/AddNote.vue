<template>
  <div class="add-note container">
    <h2 class="center-align indigo-text">Add New Note</h2>
    <form @submit.prevent="AddNote">
      <div class="field title">
        <label for="title">Note Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(item, index) in noteItems" :key="index" class="field">
        <label for="noteItem">Item:</label>
        <input type="text" name="noteItem" v-model="noteItems[index]" />
        <i class="material-icons delete" @click="deleteItem(item)">delete</i>
      </div>
      <div class="field add-noteItem">
        <label for="add-noteItem">Add an item:</label>
        <input
          type="text"
          name="add-noteItem"
          @keydown.tab.prevent="addItem"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Note</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddNote",
  data() {
    return {
      title: null,
      another: null,
      noteItems: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    AddNote() {
      // console.log(this.title, this.noteItems);
      if (this.title) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // console.log(this.slug);
        db.collection("notes")
          .add({
            title: this.title,
            noteItems: this.noteItems,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => console.log(err));
      } else {
        this.feedback = "You must enter a note title";
      }
    },
    addItem() {
      if (this.another) {
        this.noteItems.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an item";
      }
    },
    deleteItem(item) {
      this.noteItems = this.noteItems.filter(noteItem => {
        return noteItem !== item;
      });
    }
  }
};
</script>

<style>
.add-note {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-note h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-note .field {
  margin: 20px auto;
  position: relative;
}
.add-note .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
