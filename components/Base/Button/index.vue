<template>
  <button
    :class="[
      variants[variant],
      sizes[size],
      {
        '!pointer-events-none': loading,
        '!p-[2px]': variant === 'bg-white',
      },
      buttonClass,
    ]"
    :disabled
    class="rounded-28 overflow-hidden group relative disabled:!opacity-40 disabled:!pointer-events-none disabled:cursor-not-allowed transition-300 active:scale-95"
  >
    <span
      v-if="variant === 'bg-white'"
      class="bg-button-gradient absolute z-0 top-0 left-0 rounded-28 w-full h-full rounded-28"
    />
    <transition mode="out-in">
      <div :key="loading">
        <span
          :class="[
            mainClass,
            {
              '!opacity-0': loading,
              'bg-white py-2.5 px-6 rounded-28 group-hover:bg-primary transition-300':
                variant === 'bg-white',
              'flex items-center justify-center gap-2': text?.length,
              'flex-row-reverse': iconPosition === 'left',
            },
          ]"
          class="opacity-100 text-center relative z-10 leading-6"
        >
          <slot name="prefix" />
          <slot>
            <span :class="[textClass]">
              {{ text }}
            </span>
          </slot>
          <slot name="suffix" />
        </span>
        <span
          v-if="loading"
          class="absolute-center right-1/2 size-max mx-auto loading transition-300 z-10"
        >
          <svg
            class="animate-spin"
            fill="none"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              :fill="loaderFill"
              d="M18.6705 10C19.4048 10 20.0091 10.5978 19.9118 11.3256C19.7101 12.8333 19.1663 14.2813 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433284 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C5.71875 0.833744 7.16671 0.289884 8.6744 0.0882432C9.40217 -0.00909153 10 0.595234 10 1.32949C10 2.06375 9.39999 2.64679 8.67774 2.77904C7.69697 2.95865 6.75831 3.33706 5.92155 3.89617C4.71433 4.70281 3.77341 5.84932 3.21779 7.19071C2.66217 8.53211 2.51679 10.0081 2.80004 11.4322C3.0833 12.8562 3.78246 14.1642 4.80912 15.1909C5.83578 16.2175 7.14383 16.9167 8.56784 17.2C9.99186 17.4832 11.4679 17.3378 12.8093 16.7822C14.1507 16.2266 15.2972 15.2857 16.1038 14.0784C16.6629 13.2417 17.0414 12.303 17.221 11.3223C17.3532 10.6 17.9363 10 18.6705 10Z"
            />
          </svg>
        </span>
      </div>
    </transition>
  </button>
</template>

<script lang="ts" setup>
import type { TClassName } from "~/types/common"
import type { TButtonSizes, TButtonVariants } from "~/types/components/button"

interface Props {
  variant?: TButtonVariants
  size?: TButtonSizes
  loading?: boolean
  mainClass?: TClassName
  iconPosition?: "left" | "right"
  text?: string | number
  textClass?: string
  iconClass?: string
  disabled?: boolean
  buttonClass?: string
  borderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  text: "Button",
})

const variants: Record<TButtonVariants, string> = {
  primary: "gradient bg-button-gradient text-white background-position-button",
  white: "!bg-white text-blue duration-300 hover:text-white z-2 overlay-after",
  bordered:
    "gradient-border-mask text-white duration-300 hover:text-white z-2 overlay-after",
  black:
    "gradient-border-mask text-blue duration-300 hover:text-white z-2 overlay-after",
  gray: "bg-[#FFFFFF14] hover:bg-[#FFFFFF24] text-white duration-300",
  date: "gradient-border-mask-date text-white !font-semibold !text-base !px-2 !py-1 rounded-lg duration-300 z-2",
  "bg-gray":
    "bg-gray-300 !rounded-10 !p-2.5 !w-fit border border-gray-100 hover:border-primary transition-300",
  "bg-white": "bg-button-gradient text-blue p-[2px] bg-button-gradient",
}

const sizes: Record<TButtonSizes, string> = {
  md: "py-2.5 px-6 font-semibold text-sm",
}

const loaderFill = computed(() => {
  if (["outline", "outline-dark", "outline-primary"].includes(props.variant)) {
    return "#191F2E"
  }
  return "white"
})
</script>

<style scoped>
.gradient-border-mask-date {
  position: relative;
}

.gradient-border-mask-date:before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px; /* the border length */
  background: linear-gradient(180deg, #ff7544, #fb4403);
  border-radius: inherit;
  --m: conic-gradient(#000 0 0);
  mask:
    var(--m) content-box exclude,
    var(--m);
  pointer-events: none;
}

.gradient-border-mask {
  position: relative;
}

.gradient-border-mask:before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px; /* the border length */
  background: linear-gradient(180deg, #ff7544, #fb4403);
  border-radius: inherit;
  --m: conic-gradient(#000 0 0);
  mask:
    var(--m) content-box exclude,
    var(--m);
  pointer-events: none;
}

/* --- */
.without-transparency {
  padding: 0.35em 0.7em;
  border: 0.3em solid #0000;
  background:
    conic-gradient(#ddd 0 0) padding-box,
    linear-gradient(45deg, #ff4e50, #40c0cb) border-box;
}

.overlay-after {
  position: relative;
}

.overlay-after::after {
  content: "";
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(to top, #fb4403, #ff7544);
  transition: opacity 0.3s ease-out;
  z-index: -1;
  opacity: 0;
}

.overlay-after:hover::after {
  opacity: 1;
}

.gradient {
  color: #fff;
  position: relative;
  background-image: linear-gradient(to top, #fb4403, #ff7544);
  -webkit-backface-visibility: hidden;
  z-index: 1;
}

.gradient:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to top, #e84c15, #e84c15);
  transition: opacity 0.3s ease-out;
  z-index: 2;
  opacity: 0;
}

.gradient:hover:after {
  opacity: 1;
}
</style>
