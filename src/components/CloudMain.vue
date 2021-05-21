<template>
  <b-container fluid>
    <b-row>
      <b-col style="top: 20vh;" offset-md="3" md="6">
        <div v-show="isUpload" class="mb-3">
          <b-progress :value="progress"  max="100" show-progress animated></b-progress>
        </div>
        <div class="text-center">
          <b-form-group label-cols-sm="2">
            <input type="file" id="files" multiple ref="files" v-on:change="handleFilesUpload()"/>
          </b-form-group>
        </div>
        <div>
          <b-input placeholder="Введите имя файла..." block class="mb-3" v-model="fileName"></b-input>
        </div>
        <div>
          <b-button @click="downloadFile()" block class="mb-3" variant="danger">Скачать файл</b-button>
        </div>
        <div style="margin-top: 30px;">
          <b-button block variant="success" v-on:click="submitFiles()">Отправить</b-button>
        </div>
        <div class="mt-3">
          <div class="card">
            <div class="card-header">Список файлов:</div>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item"
                v-for="(file, index) in files"
                :key="index"
              >
                <span class="text-info"> Название файла:</span> {{file.name}}
                <br>
                <span class="text-info"> Вес файла: </span> {{file.size }}
              </li>
            </ul>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Main',
  data() {
    return {
      data: {},
      files: [],
      fileName: '',
      isUpload: false,
      progress: 0,
      fileInfos: []
    }
  },
  mounted: function() {
    this.getFiles();
  },

  methods: {
    addFiles(){
      this.$refs.files.click();
    },

    getFiles() {
      axios.get('https://localhost:5001/api/files').then(response => {
        console.log(response.data);
      })
    },

    downloadFile() {
      console.log(this.fileName);
      var file = {
        "name": this.fileName
      };
      
      axios.post('https://localhost:5001/api/file/download', file, {
        responseType: 'blob',
        onUploadProgress: function( progressEvent ) {
          this.isUpload = true;
          this.progress = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
        }.bind(this)
      }).then(response => {
        if(response.status === 200 || response.status === 201)
          {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', this.fileName);
            document.body.appendChild(fileLink);

            fileLink.click();
          }
      })
    },

    submitFiles(){
      let formData = new FormData();

      for( var i = 0; i < this.files.length; i++ ){
        let file = this.files[i];

        formData.append(this.files[i], file);
      }

      axios.post('https://localhost:5001/api/file/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },

          onUploadProgress: function( progressEvent ) {
            this.isUpload = true;
            this.progress = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
          }.bind(this)
        }
        ).then(() => {
          console.log('Успешно!');
        })
        .catch(() =>{
          this.progress = 0;
          console.log('Ошибка при отправлении файла');
        });
      },

      deleteFiles() {
        var files = document.getElementById('files');
        files.value = '';
      },

      handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;

        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },
  }
}
</script>

<style scoped>

</style>
