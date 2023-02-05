import pandas as pd

def compute_word_freq():
    '''
    Obtains the raw frequency of each word in the dataset.
    '''
    DATASET_REVIEWS_FILE_PATH = "datasets/reviews.csv"

    FORMAT_PUNCTUATIONS = ["+", "/", ",", ".", "!", "?", "#", "\n", "*"]
    FORMAT_SPACE = " "
    FORMAT_EMPTY = ""

    reviews_df = pd.read_csv(DATASET_REVIEWS_FILE_PATH)
    combined_title_desc = pd.concat((reviews_df["review_title"], reviews_df["review_desc"]), axis=0)

    word_freq = {}
    
    def apply_format(sentence):
        def remove_punctuations(sentence):
            for punctuation in FORMAT_PUNCTUATIONS:
                sentence = sentence.replace(punctuation, FORMAT_SPACE)
            return sentence


        def remove_trailing_lines(sentence):
            return sentence.rstrip()


        def apply_operations(sentence, ops):
            formatted_sentence = sentence
            for op in ops:
                formatted_sentence = op(formatted_sentence)
            return formatted_sentence

        sentence_formatting_rules = [
            remove_punctuations,
            remove_trailing_lines
        ]
        
        return apply_operations(sentence, sentence_formatting_rules)


    formatted_combined_title_desc = []
    for operated_sentence in map(apply_format, combined_title_desc):
        formatted_combined_title_desc += list(map(
            lambda word: word.replace(FORMAT_SPACE, FORMAT_EMPTY).rstrip(),
            operated_sentence.split(FORMAT_SPACE))
        )


    formatted_combined_title_desc = list(filter(lambda word: len(word) > 0, formatted_combined_title_desc))

    for word in formatted_combined_title_desc:
        if word in word_freq:
            word_freq[word] += 1
        else:
            word_freq[word] = 1
            
    return word_freq
