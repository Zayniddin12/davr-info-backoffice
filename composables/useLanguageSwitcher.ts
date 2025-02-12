export const useLanguageSwitcher = () => {
  const { locale, setLocale } = useI18n()
  const cookieLocale = useCookie('locale')

  const languagesList = [
    {
      name: "O'zbek",
      code: 'uz',
    },
    {
      name: 'Enland',
      code: 'en',
    },
    {
      name: 'Russion',
      code: 'ru',
    },
  ]

  const currentLanguage = computed(() =>
    languagesList.find((lang) => lang.code === locale.value),
  )

  function changeLocale(_locale: string) {
    setLocale(_locale)
    cookieLocale.value = _locale
    locale.value = _locale
  }

  return { currentLanguage, languagesList, changeLocale }
}
