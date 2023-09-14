import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number) => {
    const counter = useSignal(initialValue);
  
    const increaseCounter = $(() => {
        counter.value += 1;
    })

    const decreaseCounter = $(() => {
        counter.value -= 1;
    })

    return {
        decreaseCounter,
        increaseCounter,
        counter: useComputed$(() => counter.value)
    };
}