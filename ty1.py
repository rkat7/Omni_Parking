# Classifier demonstration on different videos:
import yaml
import numpy as np
import cv2

from imutils.object_detection import non_max_suppression

def perform_classification(video_src, cascade_src):
    cap = cv2.VideoCapture(video_src)
    car_cascade = cv2.CascadeClassifier(cascade_src)
    while True:
        ret, img = cap.read()
        if (type(img) == type(None)):
            print('Video not found')
            break
        image_scaled = cv2.resize(img, None, fx=0.6, fy=0.6)
        gray = cv2.cvtColor(image_scaled, cv2.COLOR_BGR2GRAY)
        cars = car_cascade.detectMultiScale(gray, 1.1, 1) #1.1, 1
        cars = np.array([[x, y, x + w, y + h] for (x, y, w, h) in cars])
        pick = non_max_suppression(cars, probs=None, overlapThresh=0.65)
        for (x, y, w, h) in pick:
            # cv2.rectangle(image_scaled, (x, y), (x + w, y + h), (0 , 255, 255), 2) #bgr
            cv2.rectangle(image_scaled, (x, y), (w,  h), (0, 255, 255), 2)
        cv2.imshow('Press ESC key to finish', image_scaled)

            # press escape key to exit
        if cv2.waitKey(33) == 27:
            break
    print('Execution finished')
    cv2.destroyAllWindows()
    
perform_classification('Khare_testvideo_01.mp4', 'Khare_classifier_01.xml')    # press escape to finish
perform_classification('Khare_testvideo_01.mp4', 'Khare_classifier_02.xml')
perform_classification('Khare_testvideo_02.avi', 'Khare_classifier_01.xml')    # M6 highway Britain
perform_classification('Khare_testvideo_02.avi', 'Khare_classifier_02.xml')    # M6 highway Britain