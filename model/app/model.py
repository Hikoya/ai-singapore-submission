from sgnlp.models.sentic_gcn import(
    SenticGCNConfig,
    SenticGCNModel,
    SenticGCNEmbeddingConfig,
    SenticGCNEmbeddingModel,
    SenticGCNTokenizer,
    SenticGCNPreprocessor,
    SenticGCNPostprocessor,
    download_tokenizer_files,
)

class Model:
    CONSTANTS_TOKENIZER = "tokenizer"
    CONSTANTS_CONFIG = "config"
    CONSTANTS_MODEL = "model"
    CONSTANTS_EMBED_CONFIG = "embed_config"
    CONSTANTS_EMBED_MODEL = "embed_model"
    CONSTANTS_PREPROCESSOR = "preprocessor"
    CONSTANTS_POSTPROCESSOR = "postprocessor"
    
    model = None

    def setup():
        # Run once
        if Model.model is not None:
            return
        
        Model.model = {}
        
        Model.model[Model.CONSTANTS_TOKENIZER] = SenticGCNTokenizer.from_pretrained("senticgcn_tokenizer")

        Model.model[Model.CONSTANTS_CONFIG] = SenticGCNConfig.from_pretrained(
            "senticgcn/config.json"
        )

        Model.model[Model.CONSTANTS_MODEL] = SenticGCNModel.from_pretrained(
            "senticgcn/pytorch_model.bin",
            config=Model.model[Model.CONSTANTS_CONFIG]
        )

        Model.model[Model.CONSTANTS_EMBED_CONFIG] = SenticGCNEmbeddingConfig.from_pretrained(
            "senticgcn_embedding_model/config.json"
        )

        Model.model[Model.CONSTANTS_EMBED_MODEL] = SenticGCNEmbeddingModel.from_pretrained(
            "senticgcn_embedding_model/pytorch_model.bin",
            config=Model.model[Model.CONSTANTS_EMBED_CONFIG]
        )

        Model.model[Model.CONSTANTS_PREPROCESSOR] = SenticGCNPreprocessor(
            tokenizer=Model.model[Model.CONSTANTS_TOKENIZER],
            embedding_model=Model.model[Model.CONSTANTS_EMBED_MODEL],
            senticnet="senticgcn/senticnet.pickle",
            device="cpu")

        Model.model[Model.CONSTANTS_POSTPROCESSOR] = SenticGCNPostprocessor()


    def predict(aspects, sentence):
        if Model.model is None:
            return []

        preprocessor = Model.model.get(Model.CONSTANTS_PREPROCESSOR)
        postprocessor = Model.model.get(Model.CONSTANTS_POSTPROCESSOR)
        model = Model.model.get(Model.CONSTANTS_MODEL)
        
        inputs = [{"aspects": aspects, "sentence": sentence}]

        processed_inputs, processed_indices = preprocessor(inputs)
        raw_outputs = model(processed_indices)

        post_outputs = postprocessor(processed_inputs=processed_inputs, model_outputs=raw_outputs)
        return post_outputs
