import *as yup from 'yup'

const ArticleSchema = {
    game: yup.string()
    .required('The Name is required'),

    title:yup.string()
    .required('The title is required')
    .min(20,'Make the title bigger')
    .max(200, 'Make the titile shorter'),

    excerpt:yup.string()
    .required('The excerpt is required')
    .min(100,'Make the excerpt bigger')
    .max(1000, 'Make the excerpt shorter'),

    editor:yup.string()
    .required('The title is required')
    .min(50,'Make the title bigger'),

    rating:yup.number()
    .required('The rating is required')
    .notOneOf(['Select a rating'],'You need to select a rating'),

    img: yup.string()
    .required('The image is required')
    .url('Is this a cvalid url?')


}

export default ArticleSchema;