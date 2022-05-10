import React from 'react'
import styles from './textArea.module.css'

const TextArea = ({ error, setError, data, setData, type, placeholder, name, textError, validation, value }) => {

    const onChange = (e) => {
        setData({ ...data, [name]: e.target.value })
    }
    const onValidate = (e) => {
        if (validation) {
            if (validation.test(data[name])) {
                setError(false)
            } else {
                setError(true)
            }
        }
    }

    return (
        <div className={styles.content}>
            {
                (value === '' && !error) ?
                    <textarea
                        className={styles.inputClean}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onKeyUp={onValidate}
                        onBlur={onValidate}
                    />
                    : !error ?
                        <textarea
                            className={styles.inputOfError}
                            type={type}
                            placeholder={placeholder}
                            name={name}
                            value={value}
                            onChange={onChange}
                            onKeyUp={onValidate}
                            onBlur={onValidate}
                        />
                        :
                        <textarea
                            className={styles.inputOnError}
                            type={type}
                            placeholder={placeholder}
                            name={name}
                            value={value}
                            onChange={onChange}
                            onKeyUp={onValidate}
                            onBlur={onValidate}
                        />

            }
            {
                data[name].length === 0 ? <div className={styles.offError}>{textError}</div>
                    :
                    error ? <div className={styles.onError}>{textError}</div>
                        : <div className={styles.offError}>{textError}</div>
            }
        </div>
    )
}

export default TextArea