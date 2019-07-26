<!--이미지를 업로드 하는 컴포넌트-->
<template>
  <div>
    <file-pond
      name="test"
      ref="pond"
      label-idle="Drop files here :)"
      allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      v-on:init="handleFilePondInit"
    />
    <!-- v-bind:files="myFiles" -->
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond, { setOptions } from 'vue-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// Import FilePond plugins
// Please note that you need to install these plugins separately
// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

setOptions({
  server: {
    url: 'https://api.imgur.com/',
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const formData = new FormData();
      // const pond = document.querySelector('.filepond--root');

      formData.append('image', file);
      console.log(file); // eslint-disable-line no-console
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.onprogress = (e) => {
        progress(true, e.loaded, e.total);
      };
      xmlHttpRequest.onload = () => {
        if (xmlHttpRequest.status >= 200 && xmlHttpRequest.status < 300) {
          // the load method accepts either a string (id) or an object
          progress(true, 1, 1);
          load(xmlHttpRequest.response);
        } else {
          error('Error!');
        }
      };
      xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image', true);
      xmlHttpRequest.setRequestHeader('Authorization', 'Client-ID b51957d2d1f4b57');
      xmlHttpRequest.setRequestHeader('Accept', 'application/json');

      xmlHttpRequest.onreadystatechange = (obj) => {
        if (xmlHttpRequest.readyState === 4) {
          if (xmlHttpRequest.status === 200) {
            const result = JSON.parse(xmlHttpRequest.responseText);
            console.log(result); // eslint-disable-line no-console
            console.log(`이름${file.name}  , URL : ${result.data.link}`); // eslint-disable-line no-console

            window.vueStore.commit('addImageLink', `  파일이름 :  ${file.name}<br>URL : ${result.data.link}`);
            window.vueStore.commit('addImageURL', result.data.link);
            // window.vueStore.commit('addImageTitle', file.name);
            // alert(result.data.link + " 이미지 URL");
          } else {
            alert('업로드 실패'); // eslint-disable-line no-alert
          }
        }
      };
      xmlHttpRequest.send(file);
    },
  },
});

export default {
  name: 'ImageComponent',
  data() {
    return {
    };
  },
  methods: {
    handleFilePondInit() {
      console.log('FilePond has initialized'); // eslint-disable-line no-console
      // this.$store.state.ImageTitle = '';
      this.$store.state.ImageLink = '';
    },
  },
  components: {
    FilePond,
  },
};
</script>

<style>
.filepond--file{
  margin-left: 100px;
}
  .filepond--image-preview-wrapper{
      /* align-content: center; */

  }
</style>
