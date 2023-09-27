FROM python:3.9

RUN apt-get update && apt-get install -y \
    curl unzip xvfb libxi6 libgconf-2-4

RUN curl https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o /chrome.deb
RUN dpkg -i /chrome.deb || apt-get install -yf
RUN rm /chrome.deb

RUN curl -sS -o /tmp/chromedriver_linux64.zip https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.92/linux64/chromedriver-linux64.zip && \
    unzip -qq /tmp/chromedriver_linux64.zip -d /opt/ && \
    rm /tmp/chromedriver_linux64.zip && \
    chmod +x /opt/chromedriver-linux64/chromedriver && \
    ln -fs /opt/chromedriver-linux64/chromedriver /usr/local/bin/chromedriver

# Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]