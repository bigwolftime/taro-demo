<template>
  <view>

    <view v-for="book in books" :key="book.id">

      <nut-card
        :img="book.coverUrl"
        :name="book.name"
        :publicationTime="book.publicationTime"
        :desc="book.desc"
      />


      <view>
        <image :src="book.coverUrl" alt="封面" mode="aspectFill"/>
      </view>
      <view>
        <view>
          <text>{{ book.name }}</text>
        </view>
        <view>
          <text v-for="author in book.authorList">{{ author.name }} /</text>
          <text v-for="pressName in book.pressNames">{{ pressName }} /</text>
          <text>{{ book.publicationTime }}</text>
        </view>
        <view>
          <text>{{ book.desc }}</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Taro from "@tarojs/taro";

const books = ref([] as Book[])

onMounted(() => {
  Taro.request({
    url: "http://localhost:3000/books",
    success(result) {
      books.value = result.data;

      books.value.forEach((book: Book) => {
        // 获取图书相关人员
        Taro.request({
          url: `http://localhost:3000/authors?${book.authors.map(authorId => `id=${authorId}`).join('&')}`,
          success: (res) => {
            book.authorList = [];
            for (const author of res.data) {
              if (author.type === 1 || author.type === 2) {
                book.authorList.push(author);
              }
            }
          }
        });

        Taro.request({
          url: `http://localhost:3000/dicts?type=press&${book.presses.map(pressId => `value=${pressId}`).join('&')}`,
          success: (res) => {
            book.pressNames = [];
            for (const press of res.data) {
              book.pressNames.push(press.name);
            }
          }
        });

      });
    },
  })
})
</script>
