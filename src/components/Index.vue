<template>
  <div class="index container">
    <div class="card" v-for="note in notes" :key="note.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteNote(note.id)">delete</i>
        <h2 class="indigo-text">{{ note.title }}</h2>
        <ul class="noteItems">
          <li v-for="(item, index) in note.noteItems" :key="index">
            <span class="chip">{{ item }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{ name: 'EditNote', params: { note_slug: note.slug } }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      notes: []
    };
  },
  methods: {
    deleteNote(id) {
      //delete doc from firestore
      db.collection("notes")
        .doc(id)
        .delete()
        .then(() => {
          this.notes = this.notes.filter(note => {
            return note.id !== id;
          });
        });
    }
  },
  created() {
    //fetch data from the firestore
    db.collection("notes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let note = doc.data();
          note.id = doc.id;
          this.notes.push(note);
        });
      })
      .catch(err => console.log(err));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .noteItems {
  margin: 30px auto;
}

.index .noteItems li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
