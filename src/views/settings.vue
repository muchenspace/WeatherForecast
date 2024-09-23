<template>

    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="城市名">
            <el-input v-model="weatherData.location" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item>
            <el-button @click="search" type="primary">搜索</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="citys" style="width: 100%">
        <el-table-column label="id" prop="id"> </el-table-column>
        <el-table-column label="区县" prop="name"> </el-table-column>
        <el-table-column label="市" prop="adm2"></el-table-column>
        <el-table-column label="操作" width="100">
            <template #default="{ row }">
                <el-button :icon="Check" circle plain type="success" @click="setId(row)"></el-button>
            </template>
        </el-table-column>
        <template #empty>
            <el-empty description="没有数据" />
        </template>
    </el-table>
</template>

<style></style>

<script setup>
import * as city from "../api/citys.js"
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import {useRouter} from "vue-router"
import {useIdStore} from "../stores/id.js"

const router = useRouter()

import {
    Check
} from '@element-plus/icons-vue'

const citys = ref([])
const weatherData = ref({
    location: "",
    key: " "
})

const findByName = async () => {
    const result = await city.findByname(weatherData.value)
    citys.value = result.location
    ElMessage.success("成功")
}

function search() {
    findByName();
}
function setId(row)
{
    useIdStore().id = row.id
    useIdStore().name = row.name
    router.push("/")
}
</script>