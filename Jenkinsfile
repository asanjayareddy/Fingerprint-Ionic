pipeline {
  agent any
  stages {
    stage('Install plugins') {
      environment {
        LANG = 'en_US.UTF-8'
        LC_ALL = 'en_US.UTF-8'
      }
      steps {
        sh 'npm install'
      }
    }
    stage('Compile') {
      steps {
        sh '''ionic cordova resources ios
              ionic cordova platform add ios
              ionic cordova resources android
              ionic cordova platform add android@8.0.0
           '''
      }
    }
    stage('Test') {
      steps {
        echo 'Unit tests'
      }
    }
    stage('Android/iOS Build') {
      parallel {
        stage('Android Build') {
          steps {
            sh 'ionic cordova build android '
            dir(path: 'platforms/android') {
              writeFile(file: 'fastlane/Fastfile', text: '''default_platform(:android)
                platform :android do
                  desc "Deploy a new version to the Google Play"
                    lane :build do
                        gradle(
                          task: "assemble",
                          build_type: "Release",
                          properties: {
                            "android.injected.signing.store.file" => "KEYSTORE_FILE",
                            "android.injected.signing.store.password" => "STORE_PASSWORD",
                            "android.injected.signing.key.alias" => "KEY_ALIAS",
                            "android.injected.signing.key.password" => "KEY_PASSWORD",
                          }
                        )
                upload_to_play_store(track: \'internal\', apk:\'/Users/$USERNAME/.jenkins/workspace/$BRANCH_NAME/platforms/android/app/build/outputs/apk/release/app-release.apk\')
              end
            end''')
              writeFile(file: 'fastlane/Appfile', text: '''json_key_file("/path/to/your/downloaded/key.json")
                    package_name("APP_IDENTIFIER")''')
                    sh '''chmod a+x gradlew
                    fastlane android build'''
            }
          }
        }
        stage('ios Build') {
          steps {
            sh 'ionic cordova build ios --buildConfig=build.json'
            dir(path: 'platforms/ios') {
              writeFile(file: 'fastlane/Fastfile', text: '''platform :ios do
                    desc "Push a new beta build to TestFlight"
                      lane :build do
                      get_certificates           
                      get_provisioning_profile   
                      build_app(workspace: "PROJECT_NAME.xcworkspace", scheme: "SCHEME_NAME")
                      upload_to_testflight(skip_waiting_for_build_processing: true)
                    end
                  end''')
              writeFile(file: 'fastlane/Appfile', text: '''app_identifier("APP_IDENTIFIER") # The bundle identifier of your app
                        apple_id("USER_ID") # Your Apple email address
                        itc_team_id("ITC_TEAM_ID") # App Store Connect Team ID
                        team_id("TEAM_ID") # Developer Portal Team ID''')
              sh 'fastlane ios build'
            }
          }
        }
      }
    }
  }
}