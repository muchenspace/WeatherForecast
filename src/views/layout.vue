<script setup>
import { ref } from 'vue'
import * as weather from "../api/weather.js"
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import {useRouter} from "vue-router"
import {useIdStore} from "../stores/id.js"

const router = useRouter()

const nowWeatherInfo = ref(null)
const tDWeatherInfo = ref(null)
const hoursWeatherInfo = ref(null)

const weatherData = ref({
    key: "",
    location: useIdStore().id
})


function formatTime(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}




const NowWeather = async () => {
    const result = await weather.nowWeather(weatherData.value)
    nowWeatherInfo.value = result
    ElMessage.success("成功")
}

const tDWeather = async () => {
    const result = await weather.tDWeather(weatherData.value)
    tDWeatherInfo.value = result.daily
    ElMessage.success("成功")
}
const hoursWeather = async () => {
    const result = await weather.weatherFor24H(weatherData.value);
    hoursWeatherInfo.value = result.hourly.map(weather => {
        return {
            ...weather,
            fxTime: formatTime(weather.fxTime)
        };
    });
    ElMessage.success("成功");
}

function setCity()
{
    router.push("/settings")
}

onMounted(() => {
    NowWeather();
    tDWeather();
    hoursWeather();
})

</script>


<template>
    <div class="nHWeather">
        <!--左，实时天气-->
        <div class="nowWeatherCard">
            <strong class="city">{{ useIdStore().name }}</strong>
            <strong class="tempText">{{ nowWeatherInfo?.now?.temp }}°</strong>
            <strong class="weatherText">{{ nowWeatherInfo?.now?.text }}</strong>
        </div>

        <!--右,24小时天气-->
        <el-card class="hoursWeatherCard">
            <div slot="header" class="clearfix">
                <span>24小时天气</span>
                <el-button style="float: right; padding: 3px 0" type="primary" size="mini" @click="setCity">修改地区</el-button>
            </div>
            <div class="hoursWeatherList">
                <div class="hoursWeather" v-for="weather in hoursWeatherInfo" :key="weather.fxTime">
                    <span class="time">{{ weather.fxTime }} </span>
                    <span class="text">{{ weather.text }}</span>
                    <span class="temp">{{ weather.temp }}°</span>
                </div>
            </div>
        </el-card>
    </div>

    <div class="tDweather">
        <div class="weather-component" v-for="(weather) in tDWeatherInfo" :key="weather.fxDate">
            <div class="date">{{ weather.fxDate }}</div>
            <div class="weather-info">
                <div class="condition">{{ weather.textDay }}</div>
                <div class="temperature">
                    <span class="high-temp">{{ weather.tempMax }}°C</span> / <span class="low-temp">{{ weather.tempMin }}°C</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.nHWeather {
    display: flex;

    .nowWeatherCard {
        width: 150px;
        background-color: #f8efef;
        margin-right: 20px;

        .tempText {
            color: rgb(40, 131, 81);
            font-size: 80px;
        }
    }

    .hoursWeatherCard {
        width: 100%;
        background-color: #f8efef;
        box-shadow: 5px 5px 50px grey;
        padding: 10px;
    }

    .hoursWeatherList {
        display: flex;
        overflow-x: scroll;
        /* 启用水平滚动 */
        width: 100%;
        /* 设置宽度为100% */
        padding: 10px;
    }

    .hoursWeather {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 120px;
        /* 每个小时天气卡片的宽度 */
        padding: 10px;
        border-right: 1px solid #ccc;
    }
}

.tDweather {
    display: flex;
    gap: 20px;

    .weather-component {
        font-family: Arial, sans-serif;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        max-width: 200px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        .date {
            text-align: center;
            font-size: 18px;
            margin-bottom: 10px;
            color: #333;
        }

        .weather-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .condition {
                font-size: 16px;
                color: #007BFF;
            }

            .temperature {
                font-size: 16px;
                color: #FF5733;

                .high-temp {
                    font-weight: bold;
                }

                .low-temp {
                    color: #555;
                }
            }
        }
    }
}
</style>
