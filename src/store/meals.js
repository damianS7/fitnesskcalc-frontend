import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { SERVER_URL } from "./constants.js";

const state = {
  // Registro de comidas diarias
  meals: {
    // Formato
    // "2021-7-28": { meal1: [1], meal2:[1], meal3: [1], meal4: [], meal5: [1] },
    // "2021-8-6": { meal1: [], meal5: [] },
  },
};

const getters = {
  // .... comprobar a partir de aqui
  getMealName: (state) => (mealIndex) => {
    return state.settings.meals[mealIndex].name;
  },
  getMealsFromDate: (state, getters) => (date) => {
    let meals = state.meals[date];
    if(typeof meals === 'undefined') {
      return {};
    }

    return meals;
  },
};

const mutations = {
  SET_MEALS(state, meals) {
    Vue.set(state, "meals", meals); 
  },
  SET_MEAL(state, meal) {
    Vue.set(state.meals, meal.date, meal ); 
  },
  ADD_FOOD_TO_MEAL(state, { mealKey, mealDate, foodId }) {
    let meals = state.meals;
    
    // Si no existe ningun objeto para la fecha indicada se crea
    if (typeof meals[mealDate] === "undefined") {
      Vue.set(state.meals, mealDate, {} ); 
    }

    let meal = meals[mealDate];
    // Si no existe la comida indicada en dentro de la fecha, se crea
    if(typeof meal[mealKey] === "undefined") {
      Vue.set(state.meals[mealDate], mealKey, [] );  
    }

    // Finalmente se agrega
    meal[mealKey].push(foodId);
  },
  DELETE_FOOD_FROM_MEAL(state, { mealKey, mealDate, foodIndex }) {
    Vue.delete(state.meals[mealDate][mealKey], foodIndex );
  },
};

const actions = {
  async addFoodToMeal({ commit }, { mealKey, mealDate, foodId }) {
    const payload = { meal: mealKey, date: mealDate, foodId };
    return await axios.post(SERVER_URL + "/api/v1/user/meals/food/add", payload)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("SET_MEAL", response.data);
        }
        return response;
      }).catch(function (error){
        return error.response;
      });
  },
  async deleteFoodFromMeal(context, { mealKey, mealDate, foodIndex }) {
    const payload = { meal: mealKey, date: mealDate, foodId: foodIndex };
    
    return await axios.post(SERVER_URL + "/api/v1/user/meals/food/delete", payload)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          context.commit("SET_MEAL", response.data);
        }
        return response;
      }).catch(function (error){
        return error.response;
      });
  },
};


export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true,
  };
  