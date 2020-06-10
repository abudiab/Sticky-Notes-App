<template>
  <div v-if="note" class="edit-note container">
    <h2>Edit {{ note.title }} Note</h2>
    <form @submit.prevent="EditNote">
      <div class="field title">
        <label for="title">Note Title:</label>
        <input type="text" name="title" v-model="note.title" />
      </div>
      <div v-for="(item, index) in note.noteItems" :key="index" class="field">
        <label for="noteItem">Item:</label>
        <input type="text" name="noteItem" v-model="note.noteItems[index]" />
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
        <button class="btn pink">Update Note</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditNote",
  data() {
    return {
      note: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    EditNote() {
      if (this.note.title) {
        this.feedback = null;
        // create a slug
        this.note.slug = slugify(this.note.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        // console.log(this.slug);
        db.collection("notes")
          .doc(this.note.id)
          .update({
            title: this.note.title,
            noteItems: this.note.noteItems,
            slug: this.note.slug
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
        this.note.noteItems.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an item";
      }
    },
    deleteItem(item) {
      this.note.noteItems = this.note.noteItems.filter(noteItem => {
        return noteItem !== item;
      });
    }
  },
  created() {
    let ref = db
      .collection("notes")
      .where("slug", "==", this.$route.params.note_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.data());
        this.note = doc.data();
        this.note.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-note {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-note h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-note .field {
  margin: 20px auto;
  position: relative;
}
.edit-note .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
